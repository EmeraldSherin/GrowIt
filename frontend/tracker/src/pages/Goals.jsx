import { useEffect, useState } from "react";

import {
  getGoals,
  updateGoal,
  deleteGoal,
} from "../services/goalService";

import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";

import "../components/Dashboard.css";
import "../components/Goals.css";

const Goals = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (error) {
      console.error(
        "Error fetching goals:",
        error
      );
    }
  };

  const handleGoalCreated = (newGoal) => {
    setGoals((currentGoals) => [
      newGoal,
      ...currentGoals,
    ]);
  };

  const handleIncreaseProgress = async (goal) => {
    const newProgress = Math.min(
      goal.progress + 1,
      goal.target
    );

    const newStatus =
      newProgress >= goal.target
        ? "Completed"
        : "In Progress";

    try {
      const updatedGoal = await updateGoal(
        goal._id,
        {
          progress: newProgress,
          status: newStatus,
        }
      );

      setGoals((currentGoals) =>
        currentGoals.map((item) =>
          item._id === updatedGoal._id
            ? updatedGoal
            : item
        )
      );
    } catch (error) {
      console.error(
        "Error updating goal:",
        error
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGoal(id);

      setGoals((currentGoals) =>
        currentGoals.filter(
          (goal) => goal._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Error deleting goal:",
        error
      );
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">
            Build consistency
          </span>

          <h1>Goals</h1>

          <p>
            Set long-term goals and build daily
            habits through your activities.
          </p>
        </div>
      </header>

      <GoalForm
        onGoalCreated={handleGoalCreated}
      />

      <GoalList
        goals={goals}
        onIncreaseProgress={
          handleIncreaseProgress
        }
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Goals;