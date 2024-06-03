export class PayloadTest<T> {
  command: string;
  data: T;
}

export class CreateTestPayload {
  Nama: string;

  Status: number;

  Created: Date;

  Updated: Date;

  constructor(partial?: Partial<CreateTestPayload>) {
    this.Created = new Date();
    this.Updated = new Date();
    Object.assign(this, partial);
  }
}

export class UpdateTestPayload {
  Nama: string;

  Status: number;

  Updated: Date;

  constructor(partial?: Partial<UpdateTestPayload>) {
    this.Updated = new Date();
    Object.assign(this, partial);
  }
}