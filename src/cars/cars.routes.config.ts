import express from 'express'
import { CommonRoutesConfig } from "../common/common.routes.config"
import { Car, cars, cars as cars_list } from "../models/cars" // @BUG will need to refactor this

export class CarRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CarRoutes')
    }

    // @TODO Add an endpoint to GET a list of cars
    // @TODO Add an endpoint to get a specific car
    // @TODO Add an endpoint to poist a new car to our list
    // @TODO Create a method "concat" to concatenate two strings
    // @TODO Create a new describe block for the "concat" method
    configureRoutes() {
        this.app.route(`/cars/`)
            .get((req: express.Request, res: express.Response) => {
                let { make } = req.query
                let cars_lists = cars // @BUG will need to refactor this
                if (make) {
                    cars_lists = cars.filter((car) => car.make === make)
                }
                res.status(200).send(cars_lists)
            })
            .post((req: express.Request, res: express.Response) => {
                let cars: Car[] = cars_list // @BUG will need to refactor this
                let { make, type, model, cost, id } = req.body
                if (!id || !type || !model || !cost) {
                    return res.status(400).send(`make, type, model, code, id are required`)
                }
                const new_car: Car = {
                    make: make, type: type, model: model, cost: cost, id: id
                }
                cars.push(new_car)
                res.status(201).send(new_car)
            });

        this.app.route(`/cars/:id`)
            .get((req: express.Request, res: express.Response, next: express.NextFunction) => {
                next()
            })
            // GET list of cars by specific make
            .get((req: express.Request, res: express.Response) => {
                let id = parseInt(req.params.id)
                if (!id) {
                    return res.status(400).send(`id for car is required`)
                }
                const car = cars.filter((car) => car.id === id)
                if (car && car.length === 0) {
                    return res.status(404).send(`Car is not found`)
                }
                res.status(200).send(car);
            })
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for id ${req.params.id}`);
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.id}`);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.id}`);
            });
        return this.app
    }
}