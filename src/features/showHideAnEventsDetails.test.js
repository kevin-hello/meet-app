import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let AppWrapper;

  test("An event element is collapsed by default.", ({ given, when, then }) => {
    given("the user is on the main page", async () => {
      AppWrapper = mount(<App />);
      AppWrapper.update();
    });

    when("an event is displayed", () => {});

    then("the event details will be collapsed.", () => {
      expect(AppWrapper.find(".extra-details")).toHaveLength(0);
    });
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    given("the user is shown a list of events", async () => {
      AppWrapper = await mount(<App />);
    });

    when("the user clicks on an individual event", () => {
      AppWrapper.update();
      AppWrapper.find(".details-button").at(0).simulate("click");
    });

    then("the event details will be displayed", () => {
      expect(AppWrapper.find(".extra-details")).toHaveLength(1);
    });
  });

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    given("the user has clicked on an event to display details", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find(".details-button").at(0).simulate("click");
      expect(AppWrapper.find(".extra-details")).toHaveLength(1);
    });

    when("the user clicks on “close” button", () => {
      AppWrapper.find(".details-button").at(0).simulate("click");
      expect(AppWrapper.find(".extra-details")).toHaveLength(0);
    });

    then("the event details will be hidden", () => {
      expect(AppWrapper.find(".extra-details")).toHaveLength(0);
    });
  });
});
