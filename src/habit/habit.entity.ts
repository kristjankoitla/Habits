import { Entry } from "src/entry/entry.entity";
import { User } from "src/user/user.entity";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "habit" })
export class Habit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.habits, { nullable: false })
    user: User;

    @OneToMany(() => Entry, (entry) => entry.habit)
    entries: Entry[];
}
