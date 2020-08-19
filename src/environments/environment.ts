// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/',
  key: 'george-w-bush-2-@USA',
  pgReturnUrl: 'http://localhost:4200/costatus',
  pgClientId: 14002582,
  //{"id": "", "name":""}, 
  previewItems: [{ "id": "5eece6aa5bd4a8557067f22c", "name": "Grocery Items" }, { "id": "5eece6aa5bd4a8557067f22c", "name": "Milk Products" }]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
