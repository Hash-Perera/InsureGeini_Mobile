import { BASE_URL } from "@/constants/server";
import axios from "axios";
import httpClient from "@/constants/httpclient"; // Adjust the import path as necessary

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
    return await httpClient.get(`/claims/all`);
  },
};
