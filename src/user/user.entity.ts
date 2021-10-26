import { Habit } from "src/habit/habit.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    // todo maybe unique?
    username: string;

    @Column()
    // todo important has to be encrypted
    password: string;

    @OneToMany(() => Habit, (habit) => habit.user)
    habits: Habit[];
}
