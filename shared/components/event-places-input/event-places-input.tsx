import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./event-places-input.scss";
import Skeleton from "@mui/material/Skeleton";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";

const EventPlacesInput: React.FC<any> = ({
  value,
  handleGeoCode,
  handleSelect,
  name,
  placeholder,
  disbl,
  autoComplete,
}) => {
  const handleGeoSelect = (address: any) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        handleGeoCode({ ...latLng });
        console.log("Success", latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <div className="relative">
      <div className="w-[55%] h-20 p-4 flex items-center border border-partybank-border rounded-lg cursor-pointer">
        <div className="flex items-center gap-x-2">
          <IoLocationOutline size={20} />
          <PlacesAutocomplete
            value={value}
            onChange={(ev) => {
              handleSelect(ev);
            }}
            onSelect={(val) => {
              handleSelect(val);
              handleGeoSelect(val);
            }}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  name={name}
                  {...getInputProps({
                    placeholder: placeholder,
                    disabled: disbl,
                    autoComplete: autoComplete,
                  })}
                  className="p-4 outline-none placeholder:text-partybank-text-black"
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <Skeleton animation="wave" />}
                  <div className="description-items">
                    {suggestions.map((suggestion, index) => (
                      <div {...getSuggestionItemProps(suggestion)} key={index}>
                        <div className="items">{suggestion.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </div>
    </div>
  );
};

export default EventPlacesInput;