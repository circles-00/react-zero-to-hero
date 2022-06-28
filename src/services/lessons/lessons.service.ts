// Initializes the `Lessons` service on path `/lessons`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Lessons } from './lessons.class';
import createModel from '../../models/lessons.model';
import hooks from './lessons.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'lessons': Lessons & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/lessons', new Lessons(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('lessons');

  service.hooks(hooks);
}
