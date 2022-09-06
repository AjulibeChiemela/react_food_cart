import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const fetchMealsHandler = async () => {
    const mealsDataArr = [];
    const response = await fetch(
      "https://react-course-http-69006-default-rtdb.firebaseio.com/meals.json"
    );
    const mealsDataObj = await response.json();
    for (const key in mealsDataObj) {
      let item = {
        id: key,
        name: mealsDataObj[key].name,
        description: mealsDataObj[key].description,
        price: mealsDataObj[key].price,
      };
      mealsDataArr.push(item);
    }
    setMealsData(mealsDataArr);
  };

  useEffect(() => {
    fetchMealsHandler();
  }, []);
  const mealsList = mealsData.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
