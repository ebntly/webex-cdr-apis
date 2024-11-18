import {inject} from '@loopback/core';
import { LocationService } from '../services';
import { get, param, response } from '@loopback/rest';
import { LocationSchema, LocationQuerySpec, type Location } from '../schema';

const {
  id,
  max,
  name,
  orgId,
} = LocationQuerySpec

export class LocationController {
  constructor(@inject('services.LocationService') protected locationSvc: LocationService) {}

  @get('locations')
  @response(200, {
    description: 'List locations for an organization.',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: LocationSchema.schema
        }
      }
    }
  })
  async getLocations(
    @param.query.string('id', id) id: string,
    @param.query.number('max', max) max: number,
    @param.query.string('name', name) name: string,
    @param.query.string('orgId', orgId) orgId: string
  ): Promise<Location[]> {
    const response = await this.locationSvc.getLocations(id, max, name, orgId);

    return response.items;
  }

  // @get('people/{id}')
  // @response(200, {
  //   description: 'List people in the organization.',
  //   content: {
  //     'application/json': {
  //       schema: PersonSchema
  //     }
  //   },
  // })
  // async getPerson(
  //   @param.path.string('id', PersonQuerySpec.id) userId: string,
  //   @param.query.boolean('callingData', PersonQuerySpec.callingData) callingData?: boolean,
  // ): Promise<Person> {
  //   const response = await this.peopleSvc.getPerson(userId, callingData);

  //   return response;
  // }

}
