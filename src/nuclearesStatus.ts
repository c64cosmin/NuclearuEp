import * as http from "http";
import { Config } from "./config";
import { Reactor, getReactor } from "./reactor";
import { NuclearesPaths } from "./nucleares";

export let NuclearesState: Reactor = getReactor();

export function updateNuclearesState() {
  for (const variable in NuclearesPaths) {
    doRequest(variable, NuclearesPaths[variable]);
  }
}

function doRequest(variable: string, path: (string | number)[]) {
  const options = {
    hostname: Config.NUCLEARES_PATH,
    port: Config.NUCLEARES_PORT,
    path: "/?variable=" + variable,
    method: "GET",
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const state = NuclearesState as any;
      const n = path.length;
      let entry = state[path[0]];
      for (let i = 1; i < n - 1; i++) {
        entry = entry[path[i]];
      }

      const positives = ["TRUE", "NOREACTIVO", "INMOVIL"];
      const negatives = ["FALSE", "NOREACTIVO", "INMOVIL"];

      if (positives.includes(data)) data = "1";
      if (negatives.includes(data)) data = "0";

      let value:any = data
      //is not time
      if (!data.includes(":")) {
          value = Number(data);
      }

      entry[path[n - 1]] = value;
    });
  });

  req.end();
}
