const express = require('express');
const app = express();

const pool = require('./config/database');
const Joi = require('joi');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** 
 *  เริ่มทำข้อสอบได้ที่ใต้ข้อความนี้เลยครับ
 * !!! ไม่ต้องใส่ app.listen() ในไฟล์นี้นะครับ มันจะไป listen ที่ไฟล์ server.js เองครับ !!!
 * !!! ห้ามลบ module.exports = app; ออกนะครับ  ไม่งั้นระบบตรวจไม่ได้ครับ !!!
*/

const create = Joi.object({
    title: Joi.string().required().error(new Error('ต้องกรอก title')),
    description: Joi.string().required().error(new Error('ต้องกรอก description')),
    due_date: Joi.date().iso().optional(),
})

app.get("/todo", async (req, res, next) => {

    // path data
    const start = req.query.start_date
    const end = req.query.end_date
    console.log(start, end)

    // transac begin
    const conn = await pool.getConnection();

    console.log(end == undefined)

    // detail transac
    try {
        if (start == undefined && end == undefined) {
            const [data] = await conn.query(' SELECT *, DATE_FORMAT(due_date, \'%Y-%m-%d\') AS due_date  FROM todo')
            console.log('no due_date')
            res.status(200).json(data)
        }
        else if (start == undefined) {
            const [data] = await conn.query('SELECT *, DATE_FORMAT(due_date, \'%Y-%m-%d\') AS due_date  FROM todo where `due_date < ?`', [start])
            console.log('only start')
            res.status(200).json(data)
        }
        else {
            console.log('have dude_date')
            const [data] = await conn.query(' SELECT *, DATE_FORMAT(due_date, \'%Y-%m-%d\') AS due_date  FROM todo where `due_date` between ? and ?', [start, end])
            res.status(200).json(data)
        }
        await conn.commit();
    }
    catch (err) {
        console.log(err)
        await conn.rollback();
    }
    finally {
        await conn.release();
    }
})

app.delete("/todo/:id", async (req, res, next) => {

    //data path
    const id = req.params.id

    // transac
    const conn = await pool.getConnection();
    try {
        const [data1] = await conn.query('SELECT * from todo where id = ?', [id])
        const [del] = await conn.query('DELETE from todo where id = ?', [id])
        //console.log(data1)
        res.status(200).json({
            message: `ลบ ToDo '${data1[0].title}' สำเร็จ`,
        })
        await conn.commit()
    }
    catch (err) {
        //console.log(err)
        res.status(404).json({
            "message": `ไม่พบ ToDo ที่ต้องการลบ`
        })
        await conn.rollback()
    }
    finally {
        await conn.release()
    }
})
app.post("/todo", async (req, res, next) => {

    const {error, value} = create.validate(req.body)
    if(error) {
        return res.status(400).json({
            "message": error.message
          })
    }
    //data path
    const {title, description} = req.body
    let {due_date} = req.body

    // transac
    const conn = await pool.getConnection();
    await conn.beginTransaction()

    try{
        const order = await conn.query('SELECT MAX(`order`) as maxOrder from todo')
        const [schema] = await conn.query('INSERT into todo(title, description, due_date, `order`) values(?, ?, CURRENT_TIMESTAMP, ?)'
        ,[title, description, order[0][0].maxOrder + 1])
        const [data] = await conn.query(' SELECT *, DATE_FORMAT(due_date, \'%Y-%m-%d\') AS due_date  FROM todo where id = ?',
        [schema.insertId])
        console.log(data[0].title)
        console.log(title)
        await conn.commit()
        res.status(201).json({
            "message": `สร้าง ToDo '${title}' สำเร็จ`,
            "todo": data[0]
        })
    }
    catch(err){
        console.log(err)
        await conn.rollback()
    }
    finally{
        await conn.release()
    }
})
module.exports = app;
