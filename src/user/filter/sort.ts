import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Sort {
  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  value: number;
}
