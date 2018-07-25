const validateListing = (req, res, next) => {
  try {
    const {
      address,
      price,
      description,
      propertyType,
      landSize,
      inspectionDate,
      inspectionTime,
      bedrooms,
      bathrooms,
      carSpaces
    } = req.body;

    if (
      !address ||
      !price ||
      !description ||
      !propertyType ||
      !bedrooms ||
      !bathrooms ||
      !carSpaces
    ) {
      throw new Error('Denied. Not all required listing fields given.');
    }

    const shareBody = {
      comment: `${description}\n${bedrooms} bedrooms, ${bathrooms} bathrooms, ${carSpaces} car spaces. #teambanana #property`,
      content: {
        title: `$${price} - ${address}`,
        description: `This doesnt even show! (<= 256chars)`,
        'submitted-url': `https://social-banana.herokuapp.com`,
        'submitted-image-url': `http://3.bp.blogspot.com/-6kABIu06PfM/UqX3w2XZZ6I/AAAAAAAAB8E/dBnFmfebuIc/s1600/Banana-Cottage.jpg`
      },
      visibility: {
        code: 'anyone'
      }
    };

    req.shareBody = shareBody;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
};

module.exports = { validateListing };
