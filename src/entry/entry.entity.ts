import { Habit } from "src/habit/habit.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "entry" })
export class Entry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @ManyToOne(() => Habit, (habit) => habit.entries, { nullable: false })
    habit: Habit;
}
