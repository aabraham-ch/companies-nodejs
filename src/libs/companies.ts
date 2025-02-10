
// import axios from "axios"; // this is the same as: import {default as axios} from "axios";
import {default as axios, AxiosRequestConfig} from "axios";


import * as model from "./docsapp_model"
import {Company} from "./docsapp_model";

let baseUrl = process.env.TARGET_URL || "http://localhost:8080/companies";

let config: AxiosRequestConfig<model.Company> = {
    baseURL: baseUrl
}

function validate(company: Company) {
    if (!company.type || !company.companyName || !company.registrationNumber) {
        throw Error("Invalid company");
    }
}

export function getCompanies(page: Number = 1) {
    return axios.get<model.Company[]>("", {...config,
        params: {
            pageNumber: page
          }
    })
        .then(response => {
           
            let companies: model.Company[] = response.data;
            for (let company of companies) {
                validate(company);
            }
            console.log("????????/", companies, "??????????????/")
            return companies;
        })
        .catch(error => {
            console.error(error.message)
            throw error;
        });
}

export function getCompany(companyNumber: number) {
    if (companyNumber < 100000000 || companyNumber > 999999999) {
        return Promise.reject(new Error("Invalid company number"));
    }
    return axios.get<model.Company>(`/${companyNumber}`, config)
        .then(response => {
            let company: model.Company = response.data;
            validate(company);
            return company;
        })
        .catch(error => {
            console.error(error.message)
            throw error;
        });
}

export function setupCompany(company: model.Company) {
    return axios.post<model.Company>("", company, config)
        .then(response => {
            let company: model.Company = response.data;
            validate(company);
            return company;
        })
        .catch(error => {
            console.error(error.message)
            throw error;
        });
}

export function modifyCompany(companyNumber: number, company: model.Company) {
    if (companyNumber < 100000000 || companyNumber > 999999999) {
        return Promise.reject(new Error("Invalid company number"));
    }
    return axios.put<model.Company>(`/${companyNumber}`, company, config)
        .then(response => {
            let company: model.Company = response.data;
            validate(company);
            return company;
        })
        .catch(error => {
            console.error(error.message)
            throw error;
        });
}

export function patchCompany(companyNumber: number, company: model.Company) {
    if (companyNumber < 100000000 || companyNumber > 999999999) {
        return Promise.reject(new Error("Invalid company number"));
    }
    return axios.put<model.Company>(`/${companyNumber}`, company, config)
        .then(response => {
            let company: model.Company = response.data;
            validate(company);
            return company;
        })
        .catch(error => {
            console.error(error.message)
            throw error;
        });
}

export function strikeOffCompany(companyNumber: number) {
    return axios.delete<void>(`/${companyNumber}`, config)
        .then(response => {
        })
        .catch(error => {
            console.error(error.message)

            throw error;
        });
} 