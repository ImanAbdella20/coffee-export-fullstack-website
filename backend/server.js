import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { app, connectDB } from './app.js';


dotenv.config();

const port = process.env.PORT 

const startServer = async () => {
    try {
      await connectDB();
      const server = http.createServer(app);
      server.listen(port, () => {
        console.log(`App is listening on port ${port}`);
      });
    } catch (error) {
      console.error("Error starting the server:", error);
      process.exit(1); // Exit the process with an error code
    }
  };
  
  startServer();
