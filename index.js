var selected_slot = FileLib.read("./config/ChatTriggers/modules/IceSprayBind-1.21/slot.cfg");

function get_slot(){
    selected_slot = FileLib.read("./config/ChatTriggers/modules/IceSprayBind-1.21/slot.cfg");
}

function chat_msg(string) {
    ChatLib.chat("&bIceSprayBind&f> " + string);
}

function show_help() {
    chat_msg("Use /set_slot <1-9> to use as your extra bound slot.");
    chat_msg("Set its keybind at the minecraft settings");
    chat_msg("Check the current slot with /what_slot");
}

const key_bind = Client.getKeyBindFromKey(Keyboard.KEY_F, "IceSprayBind", "");

register("command", () => {
    show_help();
}).setName("IceSprayHelp");



register("command", function(args) {
    if(parseInt(args) > 9) {
        chat_msg("Slot must be between 1-9");
        return;
    }

    if(parseInt(args) < 0) {
        chat_msg("Slot must be between 1-9");
        return;
    }

    FileLib.write("./config/ChatTriggers/modules/IceSprayBind-1.21/slot.cfg", parseInt(args));
    chat_msg("Set slot to: " + parseInt(args));
    get_slot();
}).setName("set_slot");


register("command", () => {
    chat_msg("Selected slot -> " + selected_slot);
}).setName("what_slot");

register("tick", () => {

    if(key_bind.isPressed()) {

//        chat_msg(selected_slot);

        Player.setHeldItemIndex(selected_slot - 1);

    }

});

