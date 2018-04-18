import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Typography,
} from 'material-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { items } from '../../../../related_articles.json';


const mapArticle = (props, index) =>
  <Article key={ index } { ...props } />;

const Article = ({ title, thumbnail }) =>
  <Card style={ { margin: '1rem' } }>
    <CardMedia image={ thumbnail } style={ { height: '150px' } } />
    <CardHeader title={ title }/>
    <CardActions>
      <Link to='./article'>
        <Typography variant='caption'>
          READ MORE
        </Typography>
      </Link>
    </CardActions>
  </Card>;

const RelatedArticles = () =>
  items.map(mapArticle);

export default RelatedArticles;
