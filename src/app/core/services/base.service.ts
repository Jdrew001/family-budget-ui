import { Injectable } from '@angular/core';
import { BaseConstant } from '../constants/base.constant';

export class BaseService {

  protected BASE_URL = 
  process.env['NODE_ENV'] == 'development' ? BaseConstant.DEV_URL :
    process.env['NODE_ENV'] == 'staging' ? BaseConstant.STAGING_URL: BaseConstant.PROD_URL;

  constructor() { }
}
