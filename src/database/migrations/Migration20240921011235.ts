import { Migration } from '@mikro-orm/migrations';

export class Migration20240921011235 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create type "address_type" as enum ('home', 'work');`);
    this.addSql(`create table "address" ("id" uuid not null, "city" varchar(300) not null, "street" varchar(300) not null, "house_number" int not null, constraint "address_pkey" primary key ("id"));`);

    this.addSql(`create table "user" ("id" uuid not null, "first_name" varchar(300) not null, "last_name" varchar(300) not null, "email" varchar(255) not null, "phone_number" varchar(255) not null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`create index "user_email_index" on "user" ("email");`);
    this.addSql(`create index "user_first_name_last_name_index" on "user" ("first_name", "last_name");`);

    this.addSql(`create table "user_to_address" ("user_id" uuid not null, "address_id" uuid not null, "type" "address_type" not null, constraint "user_to_address_pkey" primary key ("user_id", "address_id"));`);
    this.addSql(`alter table "user_to_address" add constraint "user_to_address_user_id_type_unique" unique ("user_id", "type");`);

    this.addSql(`alter table "user_to_address" add constraint "user_to_address_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
    this.addSql(`alter table "user_to_address" add constraint "user_to_address_address_id_foreign" foreign key ("address_id") references "address" ("id") on update cascade;`);
  }

}
