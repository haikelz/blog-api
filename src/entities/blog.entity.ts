import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Author } from "./author.entity";

@ObjectType()
@Entity({ name: "blog" })
export class Blog extends BaseEntity {
  @Field()
  @PrimaryColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  slug: string;

  @Field()
  @Column("varchar", { length: 255 })
  thumbnail: string;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.email)
  author: Author;

  @Field()
  @Column("varchar", { length: 255 })
  title: string;

  @Field()
  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Field()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Field()
  @Column("text")
  content: string;

  @Field(() => [String])
  @Column("simple-array")
  tags: string[];
}
