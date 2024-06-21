import { schedule } from "node-cron";
import { PropertyRequestsService } from "../property-requests.service";

schedule("0 0 */3 * *", async () => {
  await new PropertyRequestsService().refreshMany();
});
