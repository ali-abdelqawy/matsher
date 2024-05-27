import { model } from "mongoose";
import { PropertyRequestSchema } from "../requests";

export const PropertyAd = model("PropertyAd", PropertyRequestSchema);
