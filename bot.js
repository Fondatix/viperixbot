const disc = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const bot = new disc.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "DIRECT_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
  ],
  partials: ["CHANNEL"],
});

let prefix = ",";
let tickets = [];

bot.on("messageReactionAdd", async (msg, user) => {
  if (user.bot) {
    return;
  }
  if (
    msg.message.channel.id == "928793358833426472" ||
    msg.message.channel.id == "928795403472756816"
  ) {
    msg.message.delete();
  }
});

bot.on("messageCreate", async (msg) => {
  if (msg.content.toLowerCase().startsWith(prefix)) {
    var args = msg.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {
      case "qotd":
        if (msg.member.roles.cache.some((role) => role.name === "Staff")) {
          const helpEmbed = new MessageEmbed()
            .setColor("#02A500")
            .setTitle("QOTD")
            .setThumbnail(
              "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
            )
            .setDescription("What QOTD would you like to post?")
            .setTimestamp()
            .setFooter({
              text: msg.author.username,
              iconURL: msg.author.avatarURL(),
            });
          msg.channel.send({ embeds: [helpEmbed] });

          const filter = (m) => m.author.id == msg.author.id;

          let mCollector = msg.channel.createMessageCollector({
            filter: filter,
            time: 180000,
          });

          mCollector.on("collect", async (i) => {
            const message = i.content;
            mCollector.stop();

            let embed = new MessageEmbed()
              .setColor("#02A500")
              .setTitle("QOTD")
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
              )
              .setDescription(
                message +
                "\n\n**Answer in <#789401720962809886>**.\nQOTD sent by <@" +
                msg.author.id +
                ">."
              )
              .setTimestamp()
              .setFooter({
                text: "Viperix",
              });

            let newMessage = bot.channels.cache
              .get("789401688183930891")
              .send({ content: "<@&806406437844287508>", embeds: [embed] });

            let thanks = new MessageEmbed()
              .setColor("#02A500")
              .setTitle("Success")
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
              )
              .setDescription("Your QOTD was sent successfully.")
              .setTimestamp()
              .setFooter({
                text: msg.author.username,
                iconURL: msg.author.avatarURL(),
              });
            msg.channel.send({ embeds: [thanks] });
          });
        } else {
          let message = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Error")
            .setThumbnail(
              "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
            )
            .setDescription("You do not have permission to run this command.")
            .setTimestamp()
            .setFooter({
              text: msg.author.username,
              iconURL: msg.author.avatarURL(),
            });
          msg.channel.send({ embeds: [message], fetchReply: true });
        }
    }
  }
});

bot.on("messageCreate", async (msg) => {
  if (msg.content.toLowerCase().startsWith(prefix)) {
    var args = msg.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {
      case "help":
        const helpEmbed = new MessageEmbed()
          .setColor("#02A500")
          .setTitle("Commands")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
          )
          .addField("Everyone", "> **info**\n> **ticket**\n> **games**")
          .addField("Staff", "> **qotd**")
          .addField("Administrator", "> **announce**")
          .setTimestamp()
          .setFooter({
            text: msg.author.username,
            iconURL: msg.author.avatarURL(),
          });
        msg.channel.send({ embeds: [helpEmbed] });
    }
  }
});

bot.on("messageCreate", async (msg) => {
  if (msg.content.toLowerCase().startsWith(prefix)) {
    var args = msg.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {
      case "info":
        const helpEmbed = new MessageEmbed()
          .setColor("#02A500")
          .setTitle("Viperix")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
          )
          .setDescription(
            "🐍 We're Viperix, a thriving development studio on Roblox.\n\b"
          )
          .addField(
            "Getting started",
            "\n:loudspeaker: Find the latest announcements and codes here: <#781387501570228234>\n\n:eyes: Check out the latest sneakpeaks here: <#781390806043852830>\n\n:clipboard: Make sure to read the rules here: <#781391619823370281>\n\n:cockroach: Report any bugs here: <#830706958171504640>\n\n:white_check_mark: Give us any suggestions here: <#798125673389883413>\n\b "
          )
          .addField(
            "Games",
            "\n:video_game: You can find all our games by running `games` \b "
          )
          .addField(
            "Join us",
            "🎉 You want to join us? Great! We're regularly look for staff members here at Viperix. To apply, submit a ticket by using `ticket` and select `Staff-application`."
          )
          .addField(
            "Group link",
            "[Viperix](https://www.roblox.com/groups/5201640/Daydream-Studios#!/about)"
          )
          .setTimestamp()
          .setFooter({
            text: msg.author.username,
            iconURL: msg.author.avatarURL(),
          });
        msg.channel.send({ embeds: [helpEmbed] });
    }
  }
});

bot.on("messageCreate", async (msg) => {
  if (msg.content.toLowerCase().startsWith(prefix)) {
    var args = msg.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {
      case "games":
        const embed1 = new MessageEmbed()
          .setColor("#02A500")
          .setTitle("List of games")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
          )
          .setDescription(
            "Here's a complete list of every game released by Viperix."
          )
          .setTimestamp()
          .setFooter({
            text: msg.author.username,
            iconURL: msg.author.avatarURL(),
          });
        const embed2 = new MessageEmbed()
          .setColor("#00FFFF")
          .setTitle("Gear Zone")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/622702064723820554/928817114259787847/aa254a1be62abb4280828cad5c485d02.png"
          )
          .setDescription(
            "Battle your friends and climb the leaderboard in Gear Zone!\n\n :warning:**WARNING**:warning:\nThis was Viperix's first ever game and is very buggy. We **DON'T** recommend playing it.\n\n[Game Link](https://www.roblox.com/games/4166203820/New-Years-Update-Gear-Zone)"
          );
        const embed3 = new MessageEmbed()
          .setColor("#00B8FF")
          .setTitle("Traitor")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/622702064723820554/928817540598222908/35215b67197e0d6a59fae0902a8b4db0.png"
          )
          .setDescription(
            "Play as a passenger and complete all your tasks or play as a traitor and eliminate all the other players in this Among Us inspired game! \n\n:warning:**WARNING**:warning:\nThis was Viperix's second ever game and is very buggy. We **DON'T** recommend playing it.\n\n[Game Link](https://www.roblox.com/games/5813672791/UPDATE-Traitor-BETA)"
          );
        const embed4 = new MessageEmbed()
          .setColor("#FFB200")
          .setTitle("Rocket Boot Simulator")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/622702064723820554/928817671536001024/9da377e27cabcb470eb8308631006b0b.png"
          )
          .setDescription(
            "Fly, explore and upgrade with your friends in Rocket Boot Simulator!\n\n[Game Link](https://www.roblox.com/games/6525811994/QUESTS-Rocket-Boot-Simulator)"
          );
        const embed5 = new MessageEmbed()
          .setColor("#4E4E4E")
          .setTitle("Dodge Traffic!")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/622702064723820554/928818138353635368/080b84e1c95854656ce085c07648c2dc.png"
          )
          .setDescription(
            "You're stuck on an overpass bridge right over a busy highway. Do you have what it takes to dodge the cars that lie below and reach the tunnel?\n\n[Game Link](https://www.roblox.com/games/7494500004/Dodge-Traffic)"
          );
        msg.channel.send({ embeds: [embed1, embed2, embed3, embed4, embed5] });
    }
  }
});

function invalidFunc(author, channel) {
  let message = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Invalid Response")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
    )
    .setDescription("Please try again and respond with a valid answer.")
    .setTimestamp()
    .setFooter({ text: author.username, iconURL: author.avatarURL() });
  channel.send({ embeds: [message], fetchReply: true });
}

function cancelledFunc(author, channel) {
  let index = tickets.indexOf(author.id);
  if (index > -1) {
    tickets.splice(index, 1);
  }
  let message = new MessageEmbed()
    .setColor("#02A500")
    .setTitle("Ticket")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
    )
    .setDescription("This prompt has been cancelled.")
    .setTimestamp()
    .setFooter({ text: author.username, iconURL: author.avatarURL() });
  return { embeds: [message] };
}

function endedFunc(author, channel) {
  let index = tickets.indexOf(author.id);
  if (index > -1) {
    tickets.splice(index, 1);
  }
  let message = new MessageEmbed()
    .setColor("#02A500")
    .setTitle("Ticket")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
    )
    .setDescription("This prompt has ended.")
    .setTimestamp()
    .setFooter({ text: author.username, iconURL: author.avatarURL() });
  channel.send({ embeds: [message], fetchReply: true });
}

function staffWarning(author, dm) {
  let message = new MessageEmbed()
    .setColor("#02A500")
    .setTitle("Question 1")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
    )
    .setDescription(
      "When you submit your ticket you are **not** guaranteed a position at Viperix, do you wish to continue?"
    )
    .setTimestamp()
    .setFooter({ text: author.username, iconURL: author.avatarURL() });
  const row = new MessageActionRow();
  row.addComponents(
    new MessageButton().setCustomId("Yes").setLabel("Yes").setStyle("SUCCESS")
  );
  row.addComponents(
    new MessageButton().setCustomId("Cancel").setLabel("No").setStyle("DANGER")
  );
  return { embeds: [message], components: [row], fetchReply: true };
}

function staffExperience(author, dm) {
  let message = new MessageEmbed()
    .setColor("#02A500")
    .setTitle("Question 2")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
    )
    .setDescription(
      "What past experience do you have? \n\nPlease enter this as **one** message."
    )
    .setTimestamp()
    .setFooter({ text: author.username, iconURL: author.avatarURL() });
  const row = new MessageActionRow();
  row.addComponents(
    new MessageButton()
      .setCustomId("Cancel")
      .setLabel("Cancel")
      .setStyle("DANGER")
  );
  return { embeds: [message], components: [row], fetchReply: true };
}

function staffWhy(author, dm) {
  let message = new MessageEmbed()
    .setColor("#02A500")
    .setTitle("Question 3")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
    )
    .setDescription(
      "Why do you want to apply for this position? \n\nPlease enter this as **one** message."
    )
    .setTimestamp()
    .setFooter({ text: author.username, iconURL: author.avatarURL() });
  const row = new MessageActionRow();
  row.addComponents(
    new MessageButton()
      .setCustomId("Cancel")
      .setLabel("Cancel")
      .setStyle("DANGER")
  );
  return { embeds: [message], components: [row], fetchReply: true };
}

function staffWhy2(author, dm) {
  let message = new MessageEmbed()
    .setColor("#02A500")
    .setTitle("Question 4")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
    )
    .setDescription(
      "Why have you chosen Viperix over any other studio? \n\nPlease enter this as **one** message."
    )
    .setTimestamp()
    .setFooter({ text: author.username, iconURL: author.avatarURL() });
  const row = new MessageActionRow();
  row.addComponents(
    new MessageButton()
      .setCustomId("Cancel")
      .setLabel("Cancel")
      .setStyle("DANGER")
  );
  return { embeds: [message], components: [row], fetchReply: true };
}

function thankYou(author, dm) {
  let index = tickets.indexOf(author.id);
  if (index > -1) {
    tickets.splice(index, 1);
  }
  let message = new MessageEmbed()
    .setColor("#02A500")
    .setTitle("Thank you!")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
    )
    .setDescription("Your ticket will be reviewed shortly.")
    .setTimestamp()
    .setFooter({ text: author.username, iconURL: author.avatarURL() });
  return { embeds: [message], fetchReply: true };
}

function staffApp(author, dm) {
  let message = new MessageEmbed()
    .setColor("#02A500")
    .setTitle("What type of staff position would you like to apply to?")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
    )
    .setDescription("> **Tester**\n> **Moderator**\n> **Developer**")
    .setTimestamp()
    .setFooter({ text: author.username, iconURL: author.avatarURL() });
  const row = new MessageActionRow();
  row.addComponents(
    new MessageButton()
      .setCustomId("Tester")
      .setLabel("Tester")
      .setStyle("PRIMARY")
  );
  row.addComponents(
    new MessageButton()
      .setCustomId("Moderator")
      .setLabel("Moderator")
      .setStyle("PRIMARY")
  );
  row.addComponents(
    new MessageButton()
      .setCustomId("Developer")
      .setLabel("Developer")
      .setStyle("PRIMARY")
  );
  row.addComponents(
    new MessageButton()
      .setCustomId("Cancel")
      .setLabel("Cancel")
      .setStyle("DANGER")
  );
  return { embeds: [message], components: [row], fetchReply: true };
}

function getChannel(type) {
  if (type == "Tester") {
    return "928793358833426472";
  } else {
    return "928795403472756816";
  }
}

bot.on("messageCreate", async (msg) => {
  if (msg.content.toLowerCase().startsWith(prefix)) {
    var args = msg.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {
      case "announce":
        const guild = bot.guilds.cache.get("781386650382761994");
        guild.members.fetch(msg.author.id).then((member) => {
          if (member.permissions.any("ADMINISTRATOR")) {
            msg.author.createDM().then(async (dm) => {
              if (msg.channel.type != "DM") {
                const embed = new MessageEmbed()
                  .setColor("#02A500")
                  .setTitle("Announcement")
                  .setThumbnail(
                    "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                  )
                  .setDescription(
                    "This prompt will continue in your direct messages."
                  )
                  .setTimestamp()
                  .setFooter({
                    text: msg.author.username,
                    iconURL: msg.author.avatarURL(),
                  });
                msg.channel.send({ embeds: [embed] });
              }

              const filter = (m) => m.author.id == msg.author.id;

              let message = new MessageEmbed()
                .setColor("#02A500")
                .setTitle("Announcement")
                .setThumbnail(
                  "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                )
                .setDescription(
                  "What should the title be?\n\n Respond with `cancel` to cancel this prompt."
                )
                .setTimestamp()
                .setFooter({
                  text: msg.author.username,
                  iconURL: msg.author.avatarURL(),
                });

              dm.send({ embeds: [message] });

              let mCollector = dm.createMessageCollector({
                filter: filter,
                time: 180000,
              });

              let handled = 0;
              let stage = 1;
              let nextMessage;

              let selected1;
              let selected2;
              let selected3;
              let selected4;

              let type = "title";
              let ongoing = true;
              let finished = false;
              let fields = {};
              let field = 1;

              let finalEmbed;

              mCollector.on("collect", async (i) => {
                let processed;
                if ((i.author.id == msg.author.id) & ongoing) {
                  if (i.content == "cancel") {
                    ongoing = false;
                    mCollector.stop();
                    let message = new MessageEmbed()
                      .setColor("#02A500")
                      .setTitle("Announcement")
                      .setThumbnail(
                        "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                      )
                      .setDescription("This prompt has been cancelled.")
                      .setTimestamp()
                      .setFooter({
                        text: msg.author.username,
                        iconURL: msg.author.avatarURL(),
                      });
                    dm.send({ embeds: [message] });
                    return;
                  }
                  if (stage == 1) {
                    selected1 = i.content;
                    processed = true;
                    let embed = new MessageEmbed()
                      .setColor("#02A500")
                      .setTitle("Announcement")
                      .setThumbnail(
                        "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                      )
                      .setDescription(
                        "What should the description be?\n\n Respond with `cancel` to cancel this prompt."
                      )
                      .setTimestamp()
                      .setFooter({
                        text: msg.author.username,
                        iconURL: msg.author.avatarURL(),
                      });
                    nextMessage = { embeds: [embed] };
                  } else if (stage == 2) {
                    selected2 = i.content;
                    processed = true;
                    let embed = new MessageEmbed()
                      .setColor("#02A500")
                      .setTitle("Announcement")
                      .setThumbnail(
                        "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                      )
                      .setDescription(
                        "Enter the ID of the channel you want to post the announcement to.\n\n Respond with `cancel` to cancel this prompt."
                      )
                      .setTimestamp()
                      .setFooter({
                        text: msg.author.username,
                        iconURL: msg.author.avatarURL(),
                      });
                    nextMessage = { embeds: [embed] };
                  } else if (stage == 3) {
                    selected3 = i.content;
                    processed = true;
                    let embed = new MessageEmbed()
                      .setColor("#02A500")
                      .setTitle("Announcement")
                      .setThumbnail(
                        "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                      )
                      .setDescription(
                        "How many fields should there be?\n\n Respond with `cancel` to cancel this prompt."
                      )
                      .setTimestamp()
                      .setFooter({
                        text: msg.author.username,
                        iconURL: msg.author.avatarURL(),
                      });
                    nextMessage = { embeds: [embed] };
                  } else if ((stage >= 4) & !finished) {
                    if (finished) {
                    } else {
                      if (stage == 4) {
                        selected4 = parseInt(i.content);
                      } else {
                        if (!fields[field]) {
                          fields[field] = {};
                        }
                        fields[field][type] = i.content;
                        if (type == "title") {
                          type = "description";
                        } else {
                          field += 1;
                          type = "title";
                        }
                        if (stage >= 4 + selected4 * 2) {
                          finished = true;
                        }
                      }
                      processed = true;
                      if (!finished) {
                        let embed = new MessageEmbed()
                          .setColor("#02A500")
                          .setTitle("Field " + field)
                          .setThumbnail(
                            "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                          )
                          .setDescription(
                            "What do you want the " +
                            type +
                            " of this field to be?\n\n Respond with `cancel` to cancel this prompt."
                          )
                          .setTimestamp()
                          .setFooter({
                            text: msg.author.username,
                            iconURL: msg.author.avatarURL(),
                          });
                        nextMessage = { embeds: [embed] };
                      } else {
                        finalEmbed = new MessageEmbed()
                          .setColor("#02A500")
                          .setTitle(selected1)
                          .setThumbnail(
                            "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                          )
                          .setDescription(selected2);
                        for (let x in fields) {
                          finalEmbed.addField(
                            fields[x]["title"],
                            fields[x]["description"]
                          );
                        }
                        nextMessage = {
                          content:
                            "Here's a copy of your announcement, respond with `yes` to send it.",
                          embeds: [finalEmbed],
                        };
                      }
                    }
                  } else if (finished) {
                    ongoing = false;
                    mCollector.stop();
                    if (i.content == "yes") {
                      bot.channels.cache
                        .get(selected3)
                        .send({ embeds: [finalEmbed] });
                      let thanks = new MessageEmbed()
                        .setColor("#02A500")
                        .setTitle("Success")
                        .setThumbnail(
                          "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                        )
                        .setDescription(
                          "Your announcement was sent successfully."
                        )
                        .setTimestamp()
                        .setFooter({
                          text: msg.author.username,
                          iconURL: msg.author.avatarURL(),
                        });
                      dm.send({ embeds: [thanks] });
                    }
                  }
                  if (processed) {
                    handled = stage;
                    stage += 1;
                    mCollector.resetTimer(180000);
                    dm.send(nextMessage, dm);
                  }
                }
              });
            });
          } else {
            let message = new MessageEmbed()
              .setColor("#FF0000")
              .setTitle("Error")
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
              )
              .setDescription("You do not have permission to run this command.")
              .setTimestamp()
              .setFooter({
                text: msg.author.username,
                iconURL: msg.author.avatarURL(),
              });
            msg.channel.send({ embeds: [message], fetchReply: true });
          }
        });
    }
  }
});

bot.on("messageCreate", async (msg) => {
  if (msg.content.toLowerCase().startsWith(prefix)) {
    var args = msg.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {
      case "tickets":
        tickets.forEach(function (entry) {
          console.log(entry);
        });
    }
  }
})


bot.on("messageCreate", async (msg) => {
  if (msg.content.toLowerCase().startsWith(prefix)) {
    var args = msg.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {
      case "ticket":
        if (!tickets.includes(msg.author.id)) {
          tickets.push(msg.author.id);
          msg.author.createDM().then(async (dm) => {
            if (msg.channel.type != "DM") {
              const embed = new MessageEmbed()
                .setColor("#02A500")
                .setTitle("Ticket")
                .setThumbnail(
                  "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                )
                .setDescription(
                  "This prompt will continue in your direct messages."
                )
                .setTimestamp()
                .setFooter({
                  text: msg.author.username,
                  iconURL: msg.author.avatarURL(),
                });
              msg.channel.send({ embeds: [embed] });
            }

            const filter = (m) => m.author.id == msg.author.id;

            let message = new MessageEmbed()
              .setColor("#02A500")
              .setTitle("What type of ticket would you like to create?")
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
              )
              .setDescription("> **Staff-application**")
              .setTimestamp()
              .setFooter({
                text: msg.author.username,
                iconURL: msg.author.avatarURL(),
              });

            const row = new MessageActionRow();
            row.addComponents(
              new MessageButton()
                .setCustomId("Staff-application")
                .setLabel("Staff-application")
                .setStyle("PRIMARY")
            );

            row.addComponents(
              new MessageButton()
                .setCustomId("Cancel")
                .setLabel("Cancel")
                .setStyle("DANGER")
            );
            dm.send({ embeds: [message], components: [row] });

            let collector = dm.createMessageComponentCollector({
              time: 180000,
            });

            let mCollector = dm.createMessageCollector({
              filter: filter,
              time: 180000,
            });

            let handled = 0;
            let stage = 1;

            let selected1;
            let selected2;
            let selected4;
            let selected5;
            let selected6;

            let ongoing = true;
            let prevMessage;

            mCollector.on("collect", async (i) => {
              let processed;
              let Function;
              let IsFunction = true;
              if ((i.author.id == msg.author.id) & ongoing) {
                if (selected1 == "Staff-application") {
                  if (stage == 4) {
                    selected4 = i.content;
                    processed = true;
                    Function = staffWhy;
                  } else if (stage == 5) {
                    selected5 = i.content;
                    processed = true;
                    Function = staffWhy2;
                  } else if (stage == 6) {
                    selected6 = i.content;
                    processed = true;

                    let embed = new MessageEmbed()
                      .setColor("#02A500")
                      .setTitle(selected2 + " ticket")
                      .setThumbnail(
                        "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                      )
                      .addFields(
                        {
                          name: "User",
                          value: "<@" + msg.author.id + ">",
                        },
                        {
                          name: "Experience",
                          value: selected4,
                        },
                        {
                          name: "Reasoning",
                          value: selected5,
                        },
                        {
                          name: "Why Viperix",
                          value: selected6,
                        }
                      )
                      .setTimestamp()
                      .setFooter({
                        text: msg.author.username,
                        iconURL: msg.author.avatarURL(),
                      });

                    let newMessage = bot.channels.cache
                      .get(getChannel(selected2))
                      .send({ embeds: [embed] })
                      .then((msg) => {
                        msg.react("🗑");
                      });

                    Function = thankYou;
                    ongoing = false;
                  }
                }
                if (processed) {
                  handled = stage;
                  stage += 1;
                  collector.resetTimer(180000);
                  mCollector.resetTimer(180000);
                  if (IsFunction) {
                    prevMessage = dm.send(Function(msg.author, dm));
                  } else {
                    prevMessage = dm.send(Function);
                  }
                }
              }
            });

            collector.on("collect", async (i) => {
              if (!ongoing) {
                return;
              }
              handled = stage;

              let Function;
              let IsFunction = true;

              if (stage == 1) {
                selected1 = i.customId;
                if (i.customId == "Staff-application") {
                  Function = staffApp;
                } else if (i.customId == "Cancel") {
                  Function = cancelledFunc;
                  ongoing = false;
                }
              } else if (stage == 2) {
                if (selected1 == "Staff-application") {
                  selected2 = i.customId;
                  if ((i.customId != "Developer") & (i.customId != "Cancel")) {
                    Function = staffWarning;
                  } else if (i.customId == "Developer") {
                    let index = tickets.indexOf(msg.author.id);
                    if (index > -1) {
                      tickets.splice(index, 1);
                    }

                    let message = new MessageEmbed()
                      .setColor("#FF0000")
                      .setTitle("Error")
                      .setThumbnail(
                        "https://cdn.discordapp.com/attachments/646318760885616653/928249705106919464/StudioLogo.png"
                      )
                      .setDescription(
                        "At the moment we aren't hiring any developers, check back later!"
                      )
                      .setTimestamp()
                      .setFooter({
                        text: msg.author.username,
                        iconURL: msg.author.avatarURL(),
                      });
                    ongoing = false
                    Function = message;
                    IsFunction = false;
                  } else if (i.customId == "Cancel") {
                    ongoing = false;
                    Function = cancelledFunc;
                  }
                }
              } else if (stage == 3) {
                if (selected1 == "Staff-application") {
                  if (i.customId == "Yes") {
                    Function = staffExperience;
                  } else if (i.customId == "Cancel") {
                    ongoing = false;
                    Function = cancelledFunc;
                  }
                }
              } else if (stage == 4) {
                if (selected1 == "Staff-application") {
                  if (i.customId == "Cancel") {
                    ongoing = false;
                    Function = cancelledFunc;
                  }
                }
              } else if (stage == 5) {
                if (selected1 == "Staff-application") {
                  if (i.customId == "Cancel") {
                    ongoing = false;
                    Function = cancelledFunc;
                  }
                }
              } else if (stage == 6) {
                if (selected1 == "Staff-application") {
                  if (i.customId == "Cancel") {
                    ongoing = false;
                    Function = cancelledFunc;
                  }
                }
              }
              stage += 1;
              collector.resetTimer(180000);
              mCollector.resetTimer(180000);
              if (IsFunction) {
                if (Function) {
                  prevMessage = i.reply(Function(msg.author, dm), {
                    ephemeral: true,
                  });
                }
              } else if (Function) {
                prevMessage = i.reply(
                  { embeds: [Function] },
                  { ephemeral: true },
                  { fetchReply: true }
                );
              }
            });

            collector.on("end", (collected) => {
              if (handled != stage & !ongoing) {
                ongoing = false;
                endedFunc(msg.author, dm);
              }
            });
          });
        }
    }
  }
});

bot.on("ready", async () => {
  let guild = bot.guilds.cache.find(
    (guild) => guild.id == "781386650382761994"
  );
  let channel = await guild.channels.cache.find(
    (ch) => ch.id == "928793358833426472"
  );
  let channel2 = await guild.channels.cache.find(
    (ch) => ch.id == "928795403472756816"
  );

  channel.messages.fetch().then(async (messages) => {
    messages.forEach(async (message) => {
      if (message.partial) await message.fetch();
      if (!message.guild) return;

      for (let reactionObj of message.reactions.cache) {
        for (let reaction of reactionObj) {
          if (typeof reaction == "string") continue;
          if (reaction.emoji.id != "928812156831531028") continue;
          reaction.users.fetch().then(async (users) => {
            users.forEach(async (user) => {
              if (user.bot) return;
              message.delete();
              return;
            });
          });
        }
      }
    });
  });
  channel2.messages
    .fetch()
    .then(async (messages) => {
      messages.forEach(async (message) => {
        if (message.partial) await message.fetch();
        if (!message.guild) return;

        for (let reactionObj of message.reactions.cache) {
          for (let reaction of reactionObj) {
            if (typeof reaction == "string") continue;
            if (reaction.emoji.id != "928812156831531028") continue;
            reaction.users.fetch().then(async (users) => {
              users.forEach(async (user) => {
                if (user.bot) return;
                message.delete();
                return;
              });
            });
          }
        }
      });
    })
    .catch(console.error);
});

bot.login("NjIyNjk0MTg5MTEyNDkyMDQz.XX3nJw.cp7v1sYOSO3XoVIEYwIRgvRKyVY")
