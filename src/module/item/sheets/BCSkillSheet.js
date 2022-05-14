

export class BCSkillSheet extends ItemSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["brokencompass", "sheet"],
            template: "systems/brokecompass/templates/item/sheet.hbs"
        });
    }
}