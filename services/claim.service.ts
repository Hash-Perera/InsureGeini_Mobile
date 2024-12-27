import { BASE_URL } from "@/constants/server";
import axios from "axios";

export const ClaimService = {
  //! Submit a claim
  async submitClaim(claim: any) {
    return await axios.post(`${BASE_URL}/claims/add`, claim, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  //! Get all claims
  async getClaims() {
    return await axios.get(`${BASE_URL}/claims/all/:id`);
  },
};
