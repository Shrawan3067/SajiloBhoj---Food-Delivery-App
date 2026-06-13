import Restaurant from '../models/Restaurant.js';

export const getAllRestaurants = async (req, res) => {
  try {
    const { search, rating, priceRange, isVeg, hasOffer, isBestseller, sortBy } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisines: { $regex: search, $options: 'i' } },
      ];
    }

    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    if (priceRange) {
      const range = priceRange.split('-');
      if (range.length === 2) {
        query.priceRange = { $gte: parseInt(range[0]), $lte: parseInt(range[1]) };
      } else if (range[0] === 'low') {
        query.priceRange = { $lt: 300 };
      } else if (range[0] === 'mid') {
        query.priceRange = { $gte: 300, $lte: 600 };
      } else if (range[0] === 'high') {
        query.priceRange = { $gt: 600 };
      }
    }

    if (isVeg === 'true') {
      query.isVeg = true;
    }

    if (hasOffer === 'true') {
      query.hasOffer = true;
    }

    if (isBestseller === 'true') {
      query.isBestseller = true;
    }

    let sortOption = {};
    switch (sortBy) {
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'deliveryTime':
        sortOption = { deliveryTime: 1 };
        break;
      case 'priceLow':
        sortOption = { priceRange: 1 };
        break;
      case 'priceHigh':
        sortOption = { priceRange: -1 };
        break;
      case 'name':
        sortOption = { name: 1 };
        break;
      default:
        sortOption = { popularity: -1 };
    }

    const restaurants = await Restaurant.find(query).sort(sortOption);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getRestaurantMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant.menu);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
