from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import requests

class ActionRecommendCourse(Action):
    def name(self) -> Text:
        return "action_recommend_course"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Get the course_name slot from user input
        course_name = tracker.get_slot("course_name")

        # Call the backend API to get the course details
        if course_name:
            response = requests.get(f"http://localhost:5000/api/courses?name={course_name}")

            if response.status_code == 200:
                course_data = response.json()

                if isinstance(course_data, list) and len(course_data) > 0:
                    # Assuming the first match is the course you're looking for
                    first_course = course_data[0]

                    # Send a structured message with course details
                    dispatcher.utter_message(
                        text=f"We highly recommend the course: {first_course['name']} which costs ${first_course['price']}.",
                        json_message={
                            "name": first_course["name"],
                            "price": first_course["price"],
                            "id": first_course.get("id", "unknown"),
                            "image": first_course.get("image", "no-image.jpg"),
                        }
                    )
                else:
                    dispatcher.utter_message(text=f"Sorry, I couldn't find any courses related to {course_name}.")
            else:
                dispatcher.utter_message(text="Sorry, there was an issue fetching the course data.")
        else:
            dispatcher.utter_message(text="Please specify a course name.")

        return []
