import { Config } from "./config";
import { ClassificationRoute } from "./routes/classification";

import * as http from "http";
import * as createError from "http-errors";
import * as express from "express";
import * as logger from "morgan";

export class Server {
	private _config: Config;

	constructor(conf: Config) {
		this._config = conf;
	}

	public listen(): void {
		const app = express();
		app.set("port", this._config.getPort());

		this.registerMiddleware(app);
		this.registerErrorHandlers(app);
		this.registerRoutes(app);

		const server = http.createServer(app);
		server.listen(this._config.getPort());
	}

	private registerMiddleware(app: Express.Application): void {
		app.use(logger('dev'));
		app.use(express.json());
		app.use(express.urlencoded({ extended: false }));
	}

	private registerErrorHandlers(app: Express.Application): void {
		// 404 error handler
		app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
			next(createError(404));
		});

		// 500 error handler
		app.use((err: Express.ErrorRequestHandler, req: Express.Request, res: Express.Response, next: Express.nextFunction) => {
			// Only show error in development mode
			res.locals.message = err.message;
			res.locals.error = this._config.getMode() === Config.MODES.DEVELOPMENT ? err : {};

			// render the error page
			res.status(err.status || 500);
			res.render('error');
		});
	}

	private registerRoutes(app: Express.App): void {
		let router = express.Router();
		app.use('/api/v1/classification', router.classifyData());
	}
}
