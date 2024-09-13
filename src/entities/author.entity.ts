import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Blog } from "./blog.entity";

@ObjectType()
@Entity()
export class Author extends BaseEntity {
  @Field()
  @PrimaryColumn("varchar", { length: 255 })
  email: string;

  @Field()
  @Column("varchar", { length: 255 })
  username: string;

  @Field()
  @Column("varchar", { length: 255, nullable: true })
  image: string;

  @Field()
  @Column("text", { nullable: true })
  description: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => [Blog])
  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];
}
