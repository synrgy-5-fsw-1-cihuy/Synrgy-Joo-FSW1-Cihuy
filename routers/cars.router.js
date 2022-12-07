"use strict";

/**
 *  @swagger
 *  components:
 *      schemas:
 *          Car:
 *              type: object
 *              required:
 *                  - name
 *                  - image
 *                  - rentPerDay
 *                  - capacity
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The auto-generated id of the car.
 *                  name:
 *                      type: string
 *                      description: The name of the car.
 *                  image:
 *                      type: string
 *                      description: The image url of your car.
 *                  rentPerDay:
 *                      type: integer
 *                      description: Rent cost per day of your car.
 *                  capacity:
 *                      type: integer
 *                      description: The capacity of your car.
 *                  createdAt:
 *                      type: integer
 *                      format: timestamptz
 *                      description: The date of the record creation.
 *                  updatedAt:
 *                      type: integer
 *                      format: timestamptz
 *                      description: The date of the record update.
 *                  deletedAt:
 *                      type: integer
 *                      format: timestamptz
 *                      description: The date of the record deletion.
 *                  createdBy:
 *                      type: integer
 *                      description: The date of the record creation.
 *                  updatedBy:
 *                      type: integer
 *                      description: The date of the record update.
 *                  deletedBy:
 *                      type: integer
 *                      description: The date of the record deletion.
 */

const express = require("express");
const router = express.Router();

const usersMiddleware = require("../middleware/users.middleware");
const carsController = require("../controllers/cars.controller");

/**
 *  @swagger
 *  /cars:
 *      get:
 *          description: Returns all cars from the system that the user has access to
 *          tags: [Cars]
 *          responses:
 *              '200':
 *                  description: List of cars
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Car'
 */
router.get("/", carsController.getAll);

/**
 *  @swagger
 *  /cars/{id}:
 *      get:
 *          description: Returns one car from the system that the user has access to
 *          tags: [Cars]
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Id of car to get.
 *                required: true
 *          responses:
 *              '200':
 *                  description: Car object
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Car'
 */
router.get("/:id", carsController.getOne);

/**
 *  @swagger
 *  /cars:
 *      post:
 *          description: Insert one car to the system
 *          tags: [Cars]
 *          requestBody:
 *              required: true
 *              content:
 *                  'multipart/form-data':
 *                      schema:
 *                          $ref: '#/components/schemas/Car'
 *                      examples:
 *                          bugatti:
 *                              summary: Bugatti Veyron Car.
 *                              value:
 *                                  name: Bugatti
 *                                  image:
 *                                  rentPerDay: 750000
 *                                  capacity: 2
 *          responses:
 *              '200':
 *                  description: Car object inserted
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Car'
 */
router.post("/", usersMiddleware.checkUser("admin"), carsController.insertOne);

/**
 *  @swagger
 *  /cars/{id}:
 *      put:
 *          description: Update one car to the system
 *          tags: [Cars]
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Id of car to get.
 *                required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  'multipart/form-data':
 *                      schema:
 *                          $ref: '#/components/schemas/Car'
 *                      examples:
 *                          bugatti:
 *                              summary: Bugatti Veyron Car.
 *                              value:
 *                                  name: Bugatti
 *                                  image:
 *                                  rentPerDay: 750000
 *                                  capacity: 2
 *          responses:
 *              '200':
 *                  description: Car object inserted
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Car'
 */
router.put("/:id", usersMiddleware.checkUser("admin"), carsController.updateFull);

/**
 *  @swagger
 *  /cars/{id}:
 *      patch:
 *          description: Update one car to the system
 *          tags: [Cars]
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Id of car to get.
 *                required: true
 *          requestBody:
 *              content:
 *                  'multipart/form-data':
 *                      schema:
 *                          $ref: '#/components/schemas/Car'
 *                      examples:
 *                          bugatti:
 *                              summary: Bugatti Veyron Car.
 *                              value:
 *                                  name: Bugatti
 *                                  model: Veyron
 *                                  image:
 *                                  rentPerDay: 750000
 *                                  capacity: 2
 *          responses:
 *              '200':
 *                  description: Car object inserted
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Car'
 */
router.patch("/:id", usersMiddleware.checkUser("admin"), carsController.updatePartial);

/**
 *  @swagger
 *  /cars/{id}:
 *      delete:
 *          description: Delete one car to the system
 *          tags: [Cars]
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Id of car to get.
 *                required: true
 *          responses:
 *              '200':
 *                  description: Success Message
 *                  content:
 *                      application/json: {}
 */
router.delete("/:id", usersMiddleware.checkUser("admin"), carsController.delete);

module.exports = router;
