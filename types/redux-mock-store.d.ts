declare module 'redux-mock-store' {
  import { Store } from 'redux';

  interface StoreFactory {
    (...rest: any[]): Store<any>;
  }

  export default function configureStore(...rest: any[]): StoreFactory;
}
