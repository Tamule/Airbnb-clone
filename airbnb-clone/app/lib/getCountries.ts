

const ZA_FLAG = "🇿🇦";

type Item = {
  value: string;              
  label: string;           
  flag: string;               
  latLang: [number, number];  
  region: string;            
};

const provinces: Item[] = [
  { value: "EC",  label: "Eastern Cape",   flag: ZA_FLAG, latLang: [-32.7, 26.5],  region: "South Africa" },
  { value: "FS",  label: "Free State",     flag: ZA_FLAG, latLang: [-28.9, 26.8],  region: "South Africa" },
  { value: "GP",  label: "Gauteng",        flag: ZA_FLAG, latLang: [-26.25, 28.3], region: "South Africa" },
  { value: "KZN", label: "KwaZulu-Natal",  flag: ZA_FLAG, latLang: [-28.8, 31.0],  region: "South Africa" },
  { value: "LP",  label: "Limpopo",        flag: ZA_FLAG, latLang: [-23.8, 29.5],  region: "South Africa" },
  { value: "MP",  label: "Mpumalanga",     flag: ZA_FLAG, latLang: [-25.5, 30.9],  region: "South Africa" },
  { value: "NC",  label: "Northern Cape",  flag: ZA_FLAG, latLang: [-29.0, 21.8],  region: "South Africa" },
  { value: "NW",  label: "North West",     flag: ZA_FLAG, latLang: [-26.0, 25.3],  region: "South Africa" },
  { value: "WC",  label: "Western Cape",   flag: ZA_FLAG, latLang: [-33.5, 21.5],  region: "South Africa" },
];

export const useCountries = () => {
  const getAllCountries = () => provinces;
  const getCountryByValue = (value: string) =>
    provinces.find((item) => item.value === value);
  return { getAllCountries, getCountryByValue };
};


export const getFlagEmoji = (_: string) => ZA_FLAG;
