import "dotenv/config";
import { generateRandomMatrix } from "./generateRandomMatrix.js";
import { sendMail } from "./sendMail.js";
import { emailMap } from "./emailConfig.js";

const people = ["Birgit", "Franz", "Aurora", "Patric", "Frans Joakim"];

async function runGiftExchange() {
  console.log("🎄 Generating gift exchange matrix...\n");
  
  const result = generateRandomMatrix(people, 3);
  
  console.log("Gift assignments:");
  for (const person of people) {
    const gifts = result.givesTo[person];
    console.log(`${person} gives to: ${gifts.join(", ")}`);
  }
  
  console.log("\n📧 Sending emails...\n");
  
  // Send emails to all participants
  for (const person of people) {
    const email = emailMap[person];
    const giftsTo = result.givesTo[person];
    
    try {
      await sendMail(email, person, giftsTo);
    } catch (err) {
      console.error(`Failed to send email to ${person}`);
    }
  }
  
  console.log("\n✨ All done! Check your inboxes!");
}

runGiftExchange().catch(console.error);
