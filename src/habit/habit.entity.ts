import { Entry } from "@src/entry/entry.entity";
import { User } from "@src/user/user.entity";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";

@Entity({ name: "habit" })
@Unique("UQ_NAME_PER_USER", ["name", "userId"])
export class Habit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "int", nullable: false })
    userId: number;

    @ManyToOne(() => User, (user) => user.habits, { nullable: false })
    @JoinColumn({ name: "userId" })
    user: User;

    @OneToMany(() => Entry, (entry) => entry.habit)
    entries: Entry[];
}
