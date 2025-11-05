/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LogController } from './../src/controller/log_controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsLogController_getLogs: Record<string, TsoaRoute.ParameterSchema> = {
                value: {"in":"query","name":"value","required":true,"dataType":"double"},
                result_type: {"in":"query","name":"result_type","required":true,"dataType":"string"},
                metric_name: {"in":"query","name":"metric_name","required":true,"dataType":"string"},
                app_name: {"in":"query","name":"app_name","required":true,"dataType":"string"},
                year: {"in":"query","name":"year","required":true,"dataType":"double"},
                month: {"in":"query","name":"month","required":true,"dataType":"double"},
                day: {"in":"query","name":"day","required":true,"dataType":"double"},
                hour: {"in":"query","name":"hour","required":true,"dataType":"double"},
                minutes: {"in":"query","name":"minutes","required":true,"dataType":"double"},
        };
        app.get('/logs/search-logs',
            ...(fetchMiddlewares<RequestHandler>(LogController)),
            ...(fetchMiddlewares<RequestHandler>(LogController.prototype.getLogs)),

            async function LogController_getLogs(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLogController_getLogs, request, response });

                const controller = new LogController();

              await templateService.apiHandler({
                methodName: 'getLogs',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
