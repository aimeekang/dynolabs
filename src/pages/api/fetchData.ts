import fetch from "node-fetch";
import type { NextApiRequest, NextApiResponse } from "next";

interface Metadata {
  lat: number;
  lng: number;
}

interface ChildArea {
  area_name: string;
  metadata: Metadata;
}

interface Area {
  area_name: string;
  children: ChildArea[];
}

interface GraphQLResponse {
  data: {
    areas: Area[];
  }
}

interface ErrorResponse {
  error: string;
}

const fetchData = async (
  req: NextApiRequest,
  res: NextApiResponse<GraphQLResponse | ErrorResponse>,
) => {
  const url = "https://stg-api.openbeta.io/";
  const query = `{
  areas(filter: {area_name: {match: "Red Rocks"}}) {
    area_name
    children {
      area_name
      metadata {
        lat
        lng
      }
      children {
        area_name
        climbs {
          id
          name
          grades {
            yds
          }
          type {
            sport
            trad
          }
        }
        children {
          id
          area_name
          climbs {
            id
            name
            grades {
              yds
            }
            type {
              sport
              trad
            }
          }
        }
      }
    }
  }
}
`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(url, options);
    const data: GraphQLResponse = await response.json() as GraphQLResponse;
    const filteredData: GraphQLResponse = { data: { areas: [] } };

    if (Array.isArray(data.data.areas)) {
      filteredData.data.areas = data.data.areas.filter((area) => area.area_name === "Red Rocks");
    }

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" } as ErrorResponse);
  }
};

export default fetchData;
