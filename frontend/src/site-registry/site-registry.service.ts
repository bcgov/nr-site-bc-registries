import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { Srprfcat } from 'utils/types';
import * as fs from 'fs';

@Injectable()
export class SiteRegistryService {
  constructor(private httpService: HttpService) {}

  // try to fill the database from a .lis file
  async setData(): Promise<any> {
    var tableEntries = [];
    const data = fs.readFileSync('utils/srprfcat.lis', { encoding: 'utf8' });
    const datasplit = data.split('\n');
    datasplit.forEach((line) => {
      if (line.length > 40) {
        var dataArray = [];
        dataArray.push(line.slice(0, 10).trim());
        dataArray.push(line.slice(11, 21).trim());
        dataArray.push(line.slice(22, 32).trim());
        dataArray.push(line.slice(33, 43).trim());
        const temp = line.slice(44).split('   ');
        temp.forEach((element) => {
          const rmSpacesNewlines = element
            .replaceAll(' ', '')
            .replaceAll('\r', '')
            .replaceAll('\n', '');
          if (rmSpacesNewlines != '') {
            dataArray.push(element.trim());
          }
        });
        const dataObject: Srprfcat = {
          categoryId: dataArray[0],
          sequenceNumber: dataArray[1],
          effectiveDate: dataArray[2],
          expiryDate: dataArray[3],
          questionType: dataArray[4],
          categoryDescription: dataArray[5],
        };
        tableEntries.push(dataObject);
      }
    });
    console.log(tableEntries);

    const requestUrl = `http://localhost:3001/srprfcats/`;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // remove all request
    await lastValueFrom(
      this.httpService.delete(requestUrl, requestConfig).pipe(
        map((res) => {
          console.log(res.data);
        }),
      ),
    );
    console.log('delete request sent');
    // post request
    for (const data of tableEntries) {
      console.log('SENDING A POST REQUEST');
      // console.log(data);
      await lastValueFrom(
        this.httpService.post(requestUrl, data, requestConfig).pipe(
          map((res) => {
            console.log(res.data);
          }),
        ),
      );
    }
    console.log('Post requests sent');
    //   // get request
    //   await lastValueFrom(
    //     this.httpService.get(requestUrl, requestConfig).pipe(
    //       map((response) => {
    //         console.log('Get request');
    //         console.log(response.data);
    //         return response.data;
    //       }),
    //     ),
    //   );
    return 'hello';
  }
}
