import "./scss/styles.scss";

import { BCActor } from "./module/actor/BCActor";
import { BCActorSheet } from "./module/actor/sheets/BCActorSheet";
import { BCSkill } from "./module/item/BCSkill";
import { BCSkillSheet } from "./module/item/sheets/BCSkillSheet";
import "./module/chat/chat-hooks";

/* -------------------------------- */
/*	System initialization			*/
/* -------------------------------- */
Hooks.once("init", async () => {
  console.log(`BrokenCompass | Initializing Broken Compass game system`);

  // Initialise config
  CONFIG.Actor.entityClass = BCActor;
  CONFIG.Item.entityClass = BCSkill;

  // Preload all needed templates
  // await TemplatePreloader.preloadHandlebarsTemplates();
  await preloadHandlebarsTemplates();

  // Unregister Core sheets
  Actors.unregisterSheet("core", ActorSheet);
  Item.unregisterSheet("core", ItemSheet);

  // Register BrokenCompass actor sheets
  Actors.registerSheet("brokencompass", BCActorSheet, {
    types: ["character"],
    makeDefault: true,
  });
  // Register BrokenCompass item sheets
  Item.registerSheet("brokencompass", BCSkillSheet, {
    types: ["skill"],
    makeDefault: true
  })
});

// Hooks.on("renderChatMessage", (app, html, data) => {});

async function preloadHandlebarsTemplates() {
  const templatesPath = [
    "systems/brokencompass/templates/actor/partials/dice-tray.hbs",
    "systems/brokencompass/templates/actor/partials/fields.hbs",
  ];
  return loadTemplates(templatesPath);
}

Handlebars.registerHelper("greaterThan", function (v1, v2, options) {
  "use strict";
  if (v1 > v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper("times", function (n, block) {
  var accum = "";
  for (var i = 0; i < n; ++i) accum += block.fn(i);
  return accum;
});
