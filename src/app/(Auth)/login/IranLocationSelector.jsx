import React, { useState, useEffect, useMemo } from 'react';
import { Select, Input } from 'antd';
import { 
  EnvironmentOutlined, 
  SearchOutlined, 
  StarOutlined,
  BankOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { mainDomain } from '@/utils/mainDomain';

const { Option, OptGroup } = Select;
const { Search } = Input;

const IranLocationSelector = ({ 
  onProvinceChange, 
  onCityChange, 
  selectedProvince, 
  selectedCity,
  showPopular = true 
}) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // استان‌های پرطرفدار
  const popularProvinces = [8, 11, 4, 5, 17, 1, 2];


    // get list province & cities
    useEffect(() => {
      Promise.all([
        axios.get(`${mainDomain}/api/province`),
        axios.get(`${mainDomain}/api/cities`),
      ]).then((res) => {
        setProvinces([res[0].data.province]);
        setCities([res[1].data.cities]);
      });
    }, []);



  

  const cityGroups = useMemo(() => {
    const groups = {};
    
    provinces.forEach(province => {
      const provinceCities = cities.filter(city => 
        city.province_id === province.id
      );
      
      if (provinceCities.length > 0) {
        groups[province.name] = {
          province,
          cities: provinceCities
        };
      }
    });

    return groups;
  }, [provinces, cities]);

  const filteredCityGroups = useMemo(() => {
    if (!searchText) return cityGroups;

    const filtered = {};
    Object.entries(cityGroups).forEach(([provinceName, group]) => {
      const filteredCities = group.cities.filter(city =>
        city.name.toLowerCase().includes(searchText.toLowerCase()) ||
        provinceName.toLowerCase().includes(searchText.toLowerCase())
      );

      if (filteredCities.length > 0) {
        filtered[provinceName] = {
          ...group,
          cities: filteredCities
        };
      }
    });

    return filtered;
  }, [cityGroups, searchText]);

  const handleProvinceSelect = (provinceId) => {
    const province = provinces.find(p => p.id === provinceId);
    onProvinceChange?.(province);
  };

  const handleCitySelect = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    onCityChange?.(city);
  };

  const selectedProvinceData = provinces.find(p => p.id === selectedProvince);
  const selectedCityData = cities.find(c => c.id === selectedCity);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* بخش انتخاب استان */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
              <BankOutlined className="text-blue-500" />
              انتخاب استان
            </h3>
            <p className="text-gray-500 text-sm">استان مورد نظر خود را انتخاب کنید</p>
          </div>

          <Select
            value={selectedProvince}
            onChange={handleProvinceSelect}
            placeholder="استان خود را انتخاب کنید"
            className="w-full"
            size="large"
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {provinces.map(province => (
              <Option key={province.id} value={province.id}>
                <div className="flex items-center justify-between">
                  <span>{province.name}</span>
                  {popularProvinces.includes(province.id) && (
                    <StarOutlined className="text-yellow-500" />
                  )}
                </div>
              </Option>
            ))}
          </Select>

          {/* استان‌های پرطرفدار */}
          {showPopular && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">استان‌های پرطرفدار:</p>
              <div className="flex flex-wrap gap-2">
                {provinces
                  .filter(province => popularProvinces.includes(province.id))
                  .map(province => (
                    <button
                      key={province.id}
                      onClick={() => handleProvinceSelect(province.id)}
                      className={`px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${
                        selectedProvince === province.id
                          ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {province.name}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* بخش انتخاب شهر */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
              <EnvironmentOutlined className="text-green-500" />
              انتخاب شهر
            </h3>
            <p className="text-gray-500 text-sm">
              {selectedProvince ? 'شهرهای استان انتخاب شده' : 'همه شهرهای ایران'}
            </p>
          </div>

          <Search
            placeholder="جستجوی شهر..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full"
          />

          <Select
            value={selectedCity}
            onChange={handleCitySelect}
            placeholder="شهر خود را انتخاب کنید"
            className="w-full"
            size="large"
            showSearch
            loading={loading}
            filterOption={false}
            dropdownRender={menu => (
              <div className="bg-white rounded-lg shadow-lg">
                <div className="p-3 border-b border-gray-200">
                  <p className="font-medium text-gray-800">
                    {selectedProvince 
                      ? `شهرهای ${selectedProvinceData?.name}`
                      : 'همه شهرهای ایران'
                    }
                  </p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {menu}
                </div>
              </div>
            )}
          >
            {Object.entries(filteredCityGroups).map(([provinceName, group]) => (
              <OptGroup 
                key={provinceName} 
                label={
                  <div className="flex items-center gap-2 font-medium text-gray-800">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                      {group.cities.length}
                    </span>
                    {provinceName}
                  </div>
                }
              >
                {group.cities.map(city => (
                  <Option key={city.id} value={city.id}>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-800">{city.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {provinceName}
                      </span>
                    </div>
                  </Option>
                ))}
              </OptGroup>
            ))}
          </Select>
        </div>
      </div>

      {/* نمایش انتخاب‌های فعلی */}
      {(selectedProvince || selectedCity) && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">انتخاب‌های فعلی:</h4>
          <div className="space-y-1">
            {selectedProvince && (
              <p className="text-green-700">
                <span className="font-medium">استان:</span> {selectedProvinceData?.name}
              </p>
            )}
            {selectedCity && (
              <p className="text-green-700">
                <span className="font-medium">شهر:</span> {selectedCityData?.name}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IranLocationSelector;