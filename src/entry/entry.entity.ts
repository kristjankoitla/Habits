import { Habit } from "@src/habit/habit.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "entry" })
export class Entry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column({ type: "int", nullable: false })
    habitId: number;

    @ManyToOne(() => Habit, (habit) => habit.entries, { nullable: false })
    @JoinColumn({ name: "habitId" })
    habit: Habit;
}
