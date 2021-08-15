import { CommonRoutesConfig } from "../common/common.routes.config"
import express from 'express'

export class PersonRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PersonRoutes')
    }

    configureRoutes() {
        this.app.route(`/`)
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send("Welcome to the Cloud!")
            })

        // curl --request GET http://{host}:{port}/persons? | 400 status
        // curl --request GET http://{host}:{port}/persons?name={name} | 200 status
        this.app.route(`/persons/`)
            .get((req: express.Request, res: express.Response) => {
                let { name } = req.query
                if (!name) {
                    return res.status(400).send(`Name input is required, please provide your name?`)
                }
                return res.status(200).send(`Welcome to the Cloud, ${name}. You were able to GET in req.query format!`)
            })

        // curl -d '{"name": "Name"}' -H "Content-Type: application/json" -X POST http://localhost:8082/persons | 200 status
        this.app.route(`/persons`)
            .post((req: express.Request, res: express.Response) => {
                const { name } = req.body
                return res.status(200).send(`Welcome to the cloud, ${name}. You were able to POST in JSON format!`)
            })

        // curl --request GET http://{host}:{port}/persons | 400 status
        // curl --request GET http://{host}:{port}/persons/{name} | 200 status
        this.app.route(`/persons/:name`)
            .get((req: express.Request, res: express.Response) => {
                let { name } = req.params
                if (!name) {
                    return res.status(400).send(`name is required`)
                }
                return res.status(200).send(`Welcome to the Cloud, ${name}. You were able GET in req.params format!`)
            })
        return this.app
    }
}