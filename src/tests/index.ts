import supertest from "supertest";
import app from "..";

export const request = supertest(app);
