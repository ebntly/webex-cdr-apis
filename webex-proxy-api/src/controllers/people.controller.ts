import {inject} from '@loopback/core';
import { PeopleService } from '../services';
import { get, param, response } from '@loopback/rest';
import { PersonSchema, PersonQuerySpec, type Person } from '../schema';

const {
  email,
  displayName,
  id,
  orgId,
  roles,
  callingData,
  locationId,
  max,
} = PersonQuerySpec;

export class PeopleController {
  constructor(@inject('services.PeopleService') protected peopleSvc: PeopleService) {}

  @get('people')
  @response(200, {
    description: 'List people in the organization',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          title: 'List of People',
          items: PersonSchema.schema
        }
      }
    }
  })
  async getPeople(
    @param.query.string('email', email) email?: string,
    @param.query.string('displayName', displayName) displayName?: string,
    @param.query.string('id', id) id?: string,
    @param.query.string('orgId', orgId) orgId?: string,
    @param.query.string('roles', roles) roles?: string,
    @param.query.boolean('callingData', callingData) callingData?: boolean,
    @param.query.string('locationId', locationId) locationId?: string,
    @param.query.number('max', max) max?: number,
  ): Promise<Person[]> {
    const response = await this.peopleSvc.getPeople(
      email,
      displayName,
      id,
      orgId,
      roles,
      callingData,
      locationId,
      max,
    );

    return response.items;
  }

  @get('people/{id}')
  @response(200, {
    description: 'List people in the organization.',
    content: {
      'application/json': {
        schema: PersonSchema.schema
      }
    },
  })
  async getPerson(
    @param.path.string('id', id) userId: string,
    @param.query.boolean('callingData', callingData) callingData?: boolean,
  ): Promise<Person> {
    const response = await this.peopleSvc.getPerson(userId, callingData);

    return response;
  }

}
