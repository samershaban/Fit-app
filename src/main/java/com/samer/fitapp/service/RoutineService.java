package com.samer.fitapp.service;

import com.samer.fitapp.controller.RoutineController;
import com.samer.fitapp.controller.RoutineRequest;
import com.samer.fitapp.dao.NoteRepository;
import com.samer.fitapp.entity.Note;
import org.deeplearning4j.datasets.iterator.utilty.ListDataSetIterator;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.dataset.api.iterator.DataSetIterator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import org.deeplearning4j.nn.conf.MultiLayerConfiguration;
import org.deeplearning4j.nn.conf.NeuralNetConfiguration;
import org.deeplearning4j.nn.conf.layers.DenseLayer;
import org.deeplearning4j.nn.conf.layers.OutputLayer;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.nd4j.linalg.activations.Activation;
import org.nd4j.linalg.dataset.DataSet;
import org.nd4j.linalg.factory.Nd4j;
import org.nd4j.linalg.lossfunctions.LossFunctions;

@Service
@Transactional
public class RoutineService {

//    private RoutineRepository routineRepository;
    public List<String> createRoutine() {
        return new ArrayList<>();
    }

    private MultiLayerNetwork model;

    // Simple exercise dictionary
    private final Map<Integer, String> exerciseMap = new HashMap<>() {{
        put(0, "Push-ups");
        put(1, "Squats");
        put(2, "Plank");
        put(3, "Burpees");
        put(4, "Lunges");
        put(5, "Jumping Jacks");
        put(6, "Bicep Curls");
        put(7, "Mountain Climbers");
//        put(8, "Bench");
    }};

    public RoutineService() {
        // 4 input features: type, days/week, goal, experience
        int numInputs = 4;
        int numOutputs = exerciseMap.size();

        MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
                .seed(123)
                .list()
                .layer(new DenseLayer.Builder().nIn(numInputs).nOut(16)
                        .activation(Activation.RELU).build())
                .layer(new DenseLayer.Builder().nIn(16).nOut(32)
                        .activation(Activation.RELU).build())
                .layer(new OutputLayer.Builder(LossFunctions.LossFunction.MCXENT)
                        .activation(Activation.SOFTMAX).nIn(32).nOut(numOutputs).build())
                .build();

        model = new MultiLayerNetwork(conf);
        model.init();

        // Dummy initial training
        double[][] features = {
                {0, 3, 0, 0}, // type, days, goal, experience
                {1, 4, 1, 1}
        };
        double[][] labels = {
                {1,0,0,0,0,0,0,0}, // one-hot exercise
                {0,1,0,0,0,0,0,0}
        };

        // Wrap features and labels as 2D arrays
        DataSet initialData = new DataSet(Nd4j.create(features), Nd4j.create(labels));
        ListDataSetIterator<DataSet> iterator = new ListDataSetIterator<>(Collections.singletonList(initialData), features.length);
        model.fit(iterator, 100); // 100 epochs
    }

    // Encode user parameters to numeric features
    private double[] encodeInput(String type, int daysPerWeek, String goal, String experience) {
        double typeVal = switch (type.toLowerCase()) {
            case "strength" -> 0;
            case "cardio" -> 1;
            case "hiit" -> 2;
            case "flexibility" -> 3;
            default -> 0;
        };
        double goalVal = switch (goal.toLowerCase()) {
            case "weight_loss" -> 0;
            case "muscle_gain" -> 1;
            case "endurance" -> 2;
            case "flexibility" -> 3;
            default -> 1;
        };
        double expVal = switch (experience.toLowerCase()) {
            case "beginner" -> 0;
            case "intermediate" -> 1;
            case "advanced" -> 2;
            default -> 0;
        };
        return new double[]{typeVal, daysPerWeek, goalVal, expVal};
    }

    // Predict routine
    public String[] generateRoutine(String type, int daysPerWeek, String goal, String experience) {
        //no randomization
        double[] input = encodeInput(type, daysPerWeek, goal, experience);

        // Wrap input as 2D array for DL4J
        DataSet inputData = new DataSet(Nd4j.create(new double[][]{input}), null);
        String[] routine = new String[daysPerWeek];
//        Set<Integer> set = new HashSet<>();
        for (int i = 0; i < daysPerWeek; i++) {
//            int predictedIndex = Nd4j.argMax(model.output(Nd4j.create(new double[][]{input}))).getInt(0);
            INDArray output = model.output(Nd4j.create(new double[][]{input}));
            double[] probs = output.toDoubleVector();

            // Optionally apply temperature for more/less randomness
            double[] adjusted = applyTemperature(probs, 0.2);

            // Sample an index based on probabilities

            int predictedIndex = sampleFromDistribution(adjusted);
//            while(set.contains(predictedIndex)) {
//                System.out.println("duplicate:"+predictedIndex);
//                predictedIndex = sampleFromDistribution(adjusted);
//                set.add(predictedIndex);
//            }
//            set.add(predictedIndex);
            routine[i] = exerciseMap.get(predictedIndex);
        }
        return routine;

//        double[] features = encodeInput(type, daysPerWeek, goal, experience);
//
//        // Run model
//        INDArray output = model.output(Nd4j.create(new double[][]{features}));
//        double[] probs = output.toDoubleVector();
//
//        // Apply temperature scaling (adjust randomness)
//        double[] adjusted = applyTemperature(probs, 0.8); // tweak temperature here
//
//        // Sample from distribution
//        int chosenRoutine = sampleFromDistribution(adjusted);
//
//        // Map routine index to a workout (this is your logic)
//        String[] routine = new String[daysPerWeek];
//        for(int i=0;i<routine.length;i++) {
//            routine[i] = mapRoutine(chosenRoutine);
//        }
//        return routine;
    }

    private int sampleFromDistribution(double[] probs) {
        double rand = new Random().nextDouble();
        double cumulative = 0.0;
        for (int i = 0; i < probs.length; i++) {
            cumulative += probs[i];
            if (rand <= cumulative) {
                return i;
            }
        }
        return probs.length - 1; // fallback
    }

    private double[] applyTemperature(double[] probs, double temperature) {
        double[] scaled = new double[probs.length];
        double sum = 0.0;

        for (int i = 0; i < probs.length; i++) {
            scaled[i] = Math.pow(probs[i], 1.0 / temperature);
            sum += scaled[i];
        }
        for (int i = 0; i < probs.length; i++) {
            scaled[i] /= sum; // normalize back
        }
        return scaled;
    }

    private String mapRoutine(int id) {
        return exerciseMap.get(id);
//        switch (id) {
//            case 0: return exerciseMap.get(0);
//            case 1: return "Upper/lower split";
//            case 2: return "Push/Pull/Legs";
//            case 3: return "Cardio + Core focus";
//            case 4: return "Yoga flexibility plan";
//            default: return "General fitness routine";
//        }
    }

    // Incremental training with single example
    public void trainExample(String type, int daysPerWeek, String goal, String experience, int exerciseId) {
        double[] input = encodeInput(type, daysPerWeek, goal, experience);
        double[] label = new double[exerciseMap.size()];
        label[exerciseId] = 1.0;

        // Wrap as 2D arrays
        DataSet singleExample = new DataSet(
                Nd4j.create(new double[][]{input}),
                Nd4j.create(new double[][]{label})
        );
        ListDataSetIterator<DataSet> iterator = new ListDataSetIterator<>(Collections.singletonList(singleExample), 1);
        model.fit(iterator, 50); // few epochs
    }

    public void trainBatch(List<RoutineRequest> examples) {
        List<double[]> featureList = new ArrayList<>();
        List<double[]> labelList = new ArrayList<>();

        for (RoutineRequest req : examples) {
            double[] input = encodeInput(req.getType(), req.getDaysPerWeek(), req.getGoal(), req.getExperience());

            double[] label = new double[exerciseMap.size()]; // adjust size for number of classes
            label[req.getExerciseId()] = 1.0;

            featureList.add(input);
            labelList.add(label);
        }

        DataSet dataSet = new DataSet(
                Nd4j.create(featureList.toArray(new double[0][])),
                Nd4j.create(labelList.toArray(new double[0][]))
        );

        ListDataSetIterator<DataSet> iterator = new ListDataSetIterator<>(dataSet.asList(), 5); // batch size = 5
        model.fit(iterator, 100); // train 100 epochs
    }

    public List<String> getRoutine() {
        return new ArrayList<>();
    }

}
