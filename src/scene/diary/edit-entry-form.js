import React from 'react';
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form';
import { EntryShape, SleepLabels, ScaleSize } from '../../data/entries';
import Modal from '../../components/modal/modal';
import Form from '../../components/form/form';
import Row from '../../components/row/row';
import { TextField, TextAreaField, BarField, BlockFields } from '../../components/form/fields';
import { BlueBar, YellowBar, GreenBar, PinkBlocks } from '../../components/blocks/blocks';
import { Button } from "../../components/button/button";
import { noSubmit } from '../../utils/forms';
import { T } from '../../translations';
import style from './edit-entry-form.module.css';

const EditEntryForm = ({ onCancel, change, ...props }) => (
  <Modal>
    <Form className={style.form} {...props} >
      <div className={style.fieldsContainer}>
        <Row label={T('params.sleep')}>
          <BarField name='sleep' bar={BlueBar} max={ScaleSize} options={SleepLabels}/>
        </Row>
        <Row label={T('params.power')}>
          <BarField name='power' bar={YellowBar} max={ScaleSize} />
        </Row>
        <Row label={T('params.mood')}>
          <BarField name='mood' bar={GreenBar} max={ScaleSize} />
        </Row>
        <Row>
          <BlockFields
            blocks={PinkBlocks}
            options={[
              {
                label: T('params.insomnia'),
                name: 'insomnia',
              },
              {
                label: T('params.headache'),
                name: 'headache',
              },
              {
                label: T('params.heartache'),
                name: 'heartache',
              },
            ]}
            onChange={(...args) => {
              console.log(args);
            }}
          />
        </Row>
        <Row>
          <TextAreaField name='comment' placeholder={T('params.comment')}/>
        </Row>
      </div>
      <div className={style.buttonsContainer}>
        <Button className={style.button} onClick={noSubmit(onCancel)}>{T('editForm.cancel')}</Button>
        <Button className={style.button} >{T('editForm.save')}</Button>
      </div>
    </Form>
  </Modal>
);

EditEntryForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

const validate = data => {
  const errors = {};
  if(data.sleep === undefined) errors.sleep = 'Required';
  if(data.power === undefined) errors.power = 'Required';
  if(data.mood === undefined) errors.mood = 'Required';

  return errors;
};

export default reduxForm({
  form: 'editEntry',
  validate,
})(EditEntryForm);