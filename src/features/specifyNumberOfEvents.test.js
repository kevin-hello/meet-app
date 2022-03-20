import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  let AppWrapper;

  test("When user hasn’t specified a number, 32 is the default number.", ({
    given,
    when,
    then,
  }) => {
    given("the user is on the main page", async () => {
      AppWrapper = await mount(<App />);
    });

    when("the user hasn’t specified a number of events", () => {
      AppWrapper.update();
    });

    then(
      "the default number of events displayed will be 32 (2 for local test)",
      () => {
        expect(AppWrapper.find(".event")).toHaveLength(2);
      }
    );
  });

  test("User can change the number of events they want to see.", ({
    given,
    when,
    then,
  }) => {
    given("the user is on the main page", async () => {
      AppWrapper = await mount(<App />);
    });

    when(
      "the user set a number of events in the “Number of Events” field",
      () => {
        AppWrapper.update();
        const eventCount = { target: { value: 1 } };
        AppWrapper.find(".numberOfEvents").simulate("change", eventCount);
      }
    );

    then("the specified number of events will be displayed", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(1);
    });
  });
});
