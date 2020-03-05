import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';

const CONFIG = {
  space: 'l1csff5di73h',
  accessToken: '23383dd6f04a18a0f3977005a07b1970253a47165819c274998a8233763d811f'

}

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  constructor() { }

  getProducts(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: 'flight'
    }, query))
    .then(res => res.items);
  }
  getBlogs(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: 'blog'
    }, query))
    .then(res => res.items);
  }
}
