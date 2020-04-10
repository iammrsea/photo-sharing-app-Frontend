const axios = require('axios').default;
const fs = require('fs');

const url = 'http://localhost:5000/graphql';

const downloadSchema = async () => {
	try {
		const response = await axios({
			method: 'post',
			url,
			data: {
				variables: {},
				query: `
        {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
        `,
			},
		});
		return response.data;
	} catch (e) {
		console.log(e.toJSON());
	}
};
const saveToFile = async () => {
	try {
		const result = await downloadSchema();
		const filteredData = result.data.__schema.types.filter((type) => type.possibleTypes !== null);
		result.data.__schema.types = filteredData;
		fs.writeFileSync('./src/graphql/fragmentTypes.json', JSON.stringify(result.data));
		console.log('result', result);
	} catch (e) {
		console.log('error writing data to file', e);
	}
};
saveToFile();
