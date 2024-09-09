import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as jsonData from '../../../assets/medicaldata.json';

// array in local storage for registered medicalMapping
const medicalMappingKey = 'angular-14-registration-login-example-medicalMapping';
let medicalMapping: any = jsonData;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/MedicalMapping/Medical') && method === 'GET':
                    return getMedical();
                case url.match(/\/MedicalMapping\/\d+$/) && method === 'GET':
                    return getMedicalById();
                case url.match(/\/medicalMapping\/\d+$/) && method === 'PUT':
                    return updateMedical();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        function getMedicalById() {
            return ok(medicalMapping);
        }

        function getMedical() {
            return ok(medicalMapping);
        }

        function updateMedical() {

            // let params = body;
            // let user = medicalMapping.find(x => x.id === idFromUrl());

            // // only update password if entered
            // if (!params.password) {
            //     delete params.password;
            // }

            // // update and save user
            // Object.assign(user, params);
            // localStorage.setItem(medicalMappingKey, JSON.stringify(medicalMapping));

            return ok(medicalMapping);
        }


        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};